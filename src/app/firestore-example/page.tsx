
"use client";

import { useState, useEffect, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PageHeader from '@/components/shared/PageHeader';
import { addNote, getNotes } from '@/lib/firebase/firestore';
import type { Note } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Loader2, FileText, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';

export default function FirestoreExamplePage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNoteText, setNewNoteText] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchNotes = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedNotes = await getNotes();
      setNotes(fetchedNotes);
    } catch (err) {
      console.error("Error fetching notes:", err);
      setError("Failed to load notes. Please try again.");
      toast({ variant: "destructive", title: "Error", description: "Could not fetch notes." });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleAddNote = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newNoteText.trim()) {
      toast({ variant: "destructive", title: "Error", description: "Note cannot be empty." });
      return;
    }
    setIsSubmitting(true);
    try {
      await addNote(newNoteText);
      setNewNoteText('');
      toast({ title: "Note Added", description: "Your new note has been saved." });
      fetchNotes(); // Refresh notes list
    } catch (err) {
      console.error("Error adding note:", err);
      toast({ variant: "destructive", title: "Error", description: "Could not add note." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Firestore Demo"
        subtitle="A simple example of reading and writing data with Cloud Firestore."
      />

      <Card className="mb-8 max-w-lg mx-auto shadow-lg">
        <CardHeader>
          <CardTitle>Add a New Note</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddNote} className="space-y-4">
            <div>
              <Textarea
                placeholder="Enter your note here..."
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                rows={3}
                disabled={isSubmitting}
              />
            </div>
            <Button type="submit" disabled={isSubmitting || !newNoteText.trim()} className="w-full">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Adding Note...
                </>
              ) : (
                "Add Note"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-headline font-semibold mb-6 text-center">Stored Notes</h2>
      {isLoading && (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="ml-3 text-lg">Loading notes...</p>
        </div>
      )}
      {error && !isLoading && (
        <div className="text-center py-10 bg-destructive/10 p-6 rounded-md max-w-md mx-auto">
          <AlertTriangle className="mx-auto h-12 w-12 text-destructive mb-4" />
          <h3 className="text-xl font-semibold text-destructive mb-2">Error Loading Notes</h3>
          <p className="text-destructive/80 mb-4">{error}</p>
          <Button onClick={fetchNotes} variant="outline">Try Again</Button>
        </div>
      )}
      {!isLoading && !error && notes.length === 0 && (
        <p className="text-center text-muted-foreground py-8">No notes found. Add your first note!</p>
      )}
      {!isLoading && !error && notes.length > 0 && (
        <div className="space-y-4 max-w-2xl mx-auto">
          {notes.map((note) => (
            <Card key={note.id} className="bg-secondary/50">
              <CardContent className="p-4">
                <p className="text-foreground/90 mb-2">{note.text}</p>
                <p className="text-xs text-muted-foreground">
                  Added on: {note.createdAt ? format(note.createdAt.toDate(), 'PPpp') : 'Date not available'}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
