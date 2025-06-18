import React from "react";
import Projects from "./projects/projects";

const Dashboard = () => {
    return (
        <div className="flex flex-col gap-8 items-stretch p-10">
            <h2 className="font-semibold text-2xl uppercase tracking-widest">
                Projects
            </h2>
            <Projects />
        </div>
    );
};

export default Dashboard;
