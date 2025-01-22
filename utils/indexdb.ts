import { openDB } from "idb";
import { CRUDifyServer } from "@/utils/models/definitions";

// Open the IndexedDB database
export async function openDatabase() {
  await indexedDB.deleteDatabase("api-config");
  return openDB("crudify-config", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("config")) {
        db.createObjectStore("config", { keyPath: "name" });
      }
    },
  });
}

// Save an array of servers to IndexedDB
export async function saveToIndexedDB(servers: CRUDifyServer[]) {
  const db = await openDatabase();
  const tx = db.transaction("config", "readwrite");
  const store = tx.objectStore("config");

  // Clear the existing data before saving new servers
  await store.clear();

  // Save each server in the array
  for (const [index, server] of servers.entries()) {
    if (!server.name) {
      console.error(`Server at index ${index} is missing 'name':`, server);
      throw new Error(`Server at index ${index} is missing a 'name' property.`);
    }
    if (typeof server.name !== "string") {
      throw new Error(`Invalid 'name' type: ${typeof server.name}. Expected string.`);
    }
    await store.put(server); // Save only valid servers
  }

  await tx.done;
}

// Retrieve the array of servers from IndexedDB
export async function fetchAllFromIndexedDB(): Promise<CRUDifyServer[]> {
  const db = await openDatabase();
  return await db.getAll("config");
}

// Fetch a server by `name`
export async function fetchByApiName(name: string): Promise<CRUDifyServer | undefined> {
  const servers = await fetchAllFromIndexedDB();
  return servers.find((server) => server.name === name);
}

// Delete a server by `name`
export async function deleteByApiName(name: string): Promise<void> {
  const db = await openDatabase();
  const tx = db.transaction("config", "readwrite");
  const store = tx.objectStore("config");

  await store.delete(name);
  await tx.done;
}

// Clear all servers from IndexedDB
export async function clearIndexedDB(): Promise<void> {
  const db = await openDatabase();
  await db.clear("config");
}