import { openDB } from "idb";

// Open the IndexedDB database
export async function openDatabase() {
  return openDB("api-config", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("config")) {
        db.createObjectStore("config", { keyPath: "apiName" });
      }
    },
  });
}

// Save data to IndexedDB
export async function saveToIndexedDB(data: Record<string, any>) {
  const db = await openDatabase();
  await db.put("config", data);
  // return await db.get("config", data.apiName);
}

// Fetch all data from IndexedDB
export async function fetchAllFromIndexedDB() {
  const db = await openDatabase();
  return await db.getAll("config");
}

// Fetch a specific record by `apiName`
export async function fetchByApiName(apiName: string) {
  const db = await openDatabase();
  return await db.get("config", apiName);
}

// Delete a specific record by `apiName`
export async function deleteFromIndexedDB(apiName: string) {
  const db = await openDatabase();
  await db.delete("config", apiName);
}

// Clear all data from IndexedDB
export async function clearIndexedDB() {
  const db = await openDatabase();
  await db.clear("config");
}