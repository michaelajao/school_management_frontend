// Skeleton UI
import React, { useState } from 'react';
import { ClassArm } from '../../app/dashboard/academics/classes/type';

const ClassManagement: React.FC = () => {
	const [classes, setClasses] = useState<ClassArm[]>([
		{
			id: '1',
			name: 'JSS 2A',
			teacher: 'Mr. John',
			assistant: 'Ms. Ada',
			studentCount: 35,
		},
		{
			id: '2',
			name: 'SS1 B',
			teacher: 'Mrs. Kemi',
			assistant: '',
			studentCount: 28,
		},
	]);

	return (
		<div>
			<h2>Class Management</h2>
			<table>
				<thead>
					<tr>
						<th>Class</th>
						<th>Teacher</th>
						<th>Assistant</th>
						<th>Students</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{classes.map((cls) => (
						<tr key={cls.id}>
							<td>{cls.name}</td>
							<td>{cls.teacher}</td>
							<td>{cls.assistant || '-'}</td>
							<td>{cls.studentCount}</td>
							<td>
								<button>Edit</button>
								<button>View</button>
							</td>
						</tr>
					))
					}
				</tbody>
			</table>
		</div>
	);
};
export default ClassManagement;
