
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
  query,
  orderBy,
  Timestamp
} from 'firebase/firestore';
import { db } from './config';
import type { NutritionProduct, Note } from '@/lib/types';

const PRODUCTS_COLLECTION = 'products';

// Create
export const addNutritionProduct = async (productData: Omit<NutritionProduct, 'id'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), productData);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

// Read All
export const getNutritionProducts = async (): Promise<NutritionProduct[]> => {
  try {
    const q = query(collection(db, PRODUCTS_COLLECTION), orderBy("name")); // Optional: order by name
    const querySnapshot = await getDocs(q);
    const products: NutritionProduct[] = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() } as NutritionProduct);
    });
    return products;
  } catch (e) {
    console.error("Error getting documents: ", e);
    throw e;
  }
};

// Read One
export const getNutritionProductById = async (id: string): Promise<NutritionProduct | null> => {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as NutritionProduct;
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (e) {
    console.error("Error getting document: ", e);
    throw e;
  }
};

// Update
export const updateNutritionProduct = async (id: string, productData: Partial<NutritionProduct>): Promise<void> => {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    await updateDoc(docRef, productData);
  } catch (e) {
    console.error("Error updating document: ", e);
    throw e;
  }
};

// Delete
export const deleteNutritionProduct = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, PRODUCTS_COLLECTION, id);
    await deleteDoc(docRef);
  } catch (e) {
    console.error("Error deleting document: ", e);
    throw e;
  }
};

// --- Notes Example ---
const NOTES_COLLECTION = 'notes';

export const addNote = async (noteText: string): Promise<string> => {
  try {
    if (!noteText.trim()) {
      throw new Error("Note text cannot be empty.");
    }
    const docRef = await addDoc(collection(db, NOTES_COLLECTION), {
      text: noteText,
      createdAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (e) {
    console.error("Error adding note: ", e);
    throw e;
  }
};

export const getNotes = async (): Promise<Note[]> => {
  try {
    const q = query(collection(db, NOTES_COLLECTION), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const notes: Note[] = [];
    querySnapshot.forEach((doc) => {
      notes.push({ id: doc.id, ...doc.data() } as Note);
    });
    return notes;
  } catch (e) {
    console.error("Error getting notes: ", e);
    throw e;
  }
};
