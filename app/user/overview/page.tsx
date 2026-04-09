import { Suspense } from "react";
import UserOverviewContent from "./user-overview-content";

export default function CurrentUserOverviewPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserOverviewContent />
    </Suspense>
  );
}
