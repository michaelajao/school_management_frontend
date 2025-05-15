import { getParents } from "@/lib/utils";
import { SummaryCard } from "@/components/admin/parents/SummaryCard";


// fakeData
import { parents, studentColumns, studentRows } from "@/lib/fakeData";
import { GenericTable } from "@/components/ui/GenericTable";
import StudentModal from "@/components/admin/students/AddnewModal";

export default function StudentManagement() {
  // fetches fake data and stores them in active and pending
  // active:  parents who are active on the management system
  // pending: parents who have been invited but are yet to login into the platform.
  const { active, pending } = getParents(parents);


  return (
    <div className="bg-zinc-100 p-6 rounded-2xl">
      <section>
        <h1 className="text-xl font-bold text-gray-700">Parent Management</h1>
        <p className="text-sm">Create, update, delete parent access</p>
      </section>

      {/* Summary Metrics section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-4">
        <SummaryCard
          label="Total Parent / Guardian"
          value={active.length + pending.length}
          icon={"/graduationcap.svg"}
          textColor="#008080"
          bgColor="#BDFAFF4D"
        />
        <SummaryCard
          label="Registered Parents"
          value={active.length}
          icon={"/people.svg"}
          textColor="#FF9F43"
          bgColor="#FFAB5A33"
        />
        <SummaryCard
          label="Pending Invites"
          value={pending.length}
          icon={"/femalepeople.svg"}
          textColor="#6A24FF"
          bgColor="#6A24FF26"
        />
      </section>

      {/* Pending Invites */}
      <div className="bg-white rounded-xl p-4 space-y-4">
        {/* Parent Table */}
        <section className="my-6">
          <h2 className="text-lg text-gray-700 font-semibold">Parent List</h2>
          <p className="text-sm">Mange users and their permissions</p>
          <GenericTable
            columns={studentColumns}
            rows={studentRows}
            totalCount={studentRows.length}
            addNewTrigger={<StudentModal />}
          />
        </section>
      </div>
    </div>
  );
}
