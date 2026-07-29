import ErrorApi from "@/components/shared/ErrorApi";
import EmptyEpics from "./EmptyEpics";
import { getEpics } from "../api/epics-server-api";
import EpicsGrid from "./EpicsGrid";

type Props = {
  projectId: string;
};

export default async function ListEpics({ projectId }: Props) {
  let epics;
  try {
    epics = await getEpics(projectId);
  } catch {
    return <ErrorApi />;
  }
  if (!epics.length) {
    return <EmptyEpics projectId={projectId} />;
  }
  return <EpicsGrid epics={epics} />;
}
