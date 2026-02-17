import { fetchNoteById } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NoteDetailsClient from "../../../notes/[id]/NoteDetails.client";
import NotePreview from "@/components/NotePreview/NotePreview";

interface NoteDetailsProps {
  params: Promise<{ id: string }>;
}

export default async function NoteDetails({ params }: NoteDetailsProps) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreview>
        <NoteDetailsClient />
      </NotePreview>
    </HydrationBoundary>
  );
}
