"use client"
import { CreateTask } from "@/components/CreateTask";
import { SideMenu } from "@/components/SideMenu";
import { TaskGrid } from "@/components/TaskGrid";
import { useState } from "react";

export default function Home() {

  return (
    <div>
        <div className="grid grid-cols-5">
                <div className="col-span-1 p-4">
                    <SideMenu/>
                </div>
                <div className="col-span-4 p-4 pt-0">
                    <TaskGrid/>
                </div>
        </div>
    </div>
  );
}
