import React from 'react'

const StaffInfo = () => {
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12 text-sm">
                <Info label="Staff ID" value="STU-2025-0148" />
                <Info label="Email" value="jennyjohnson@gmail.com" />
                <Info label="Phone Number" value="+234 8123456789" />
                <Info label="Gender" value="Female" />
                <Info label="Assigned" value="Record Officer" />
                <Info
                    label="Address"
                    value="24 derin close, Leki-Epe Expressway, Lagos"
                />
                <Info label="Date Of Birth" value="1st November 1990" />
                <Info label="Marital Status" value="Married" />
                <Info label="State Of Origin" value="Lagos State" />
                <Info label="Medical Condition" value="Nil" />
                <Info label="Last Login" value="2 days ago" />
            </div>
        </div>
    )
}

export default StaffInfo


function Info({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <p className="text-gray-500 font-medium">{label}</p>
            <p className="text-gray-800">{value}</p>
        </div>
    );
}