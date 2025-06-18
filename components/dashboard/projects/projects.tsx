"use client";
import React from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState,
} from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn, sinceDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Plus, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useUser } from "@/components/auth/user-context";

export type Project = {
    _id: string;
    userId: string;
    name: string;
    data: any;
    last_edited: Date;
};

const Projects = () => {
    const userContext = useUser();
    if (!userContext) return;
    const { user } = userContext;
    const [data, setData] = React.useState<Project[]>([]);

    const columns: ColumnDef<Project>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) =>
                        table.toggleAllPageRowsSelected(!!value)
                    }
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "name",
            header: "Site Name",
            cell: ({ row }) => (
                <div
                    className="lowercase"
                    //   onClick={() => handleOpenProject(row.original)}
                >
                    {row.getValue("name")}
                </div>
            ),
        },
        {
            accessorKey: "last_edited",
            header: "Last Edited",
            cell: ({ row }) => (
                <div className="capitalize">
                    {sinceDate(row.getValue("last_edited"))}
                </div>
            ),
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const { _id: id, name } = row.original;
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size={"icon"}>
                                <MoreHorizontal />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem
                            //   onClick={() => router.push(`/preview/${id}/`)}
                            >
                                <span>Preview</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                            // disabled={projectExports.includes(id)}
                            // onClick={() => handleExportProject(id, name)}
                            >
                                <span>Export</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <span className="text-destructive">Trash</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    const addProjectInput = React.useRef<HTMLInputElement | null>(null);

    const fetchProjects = async () => {
        if (!user) return;
        const req = await fetch(`/api/projects/list?email=${user.email}`);
        const res = await req.json();
        if (res.success) {
            const projects: Project[] = JSON.parse(res.projects);
            setData(projects);
        }
    };
    React.useEffect(() => {
        fetchProjects();
    }, [user]);
    const handleAddProject = async () => {
        if (!addProjectInput.current) return;
        const projectName = addProjectInput.current.value;
        if (projectName.length < 4) return;
        const res = await fetch("/api/projects", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: user?.email,
                name: projectName,
            }),
        });

        const data = await res.json();
        if (data.success) {
            addProjectInput.current.value = "";
            fetchProjects();
        }
    };

    return (
        <div className="flex h-full sm:m-5 p-5 rounded-lg border">
            <div className="w-full">
                <div className="flex flex-col-reverse sm:flex-row gap-4 sm:items-center py-4 justify-between">
                    <Input
                        placeholder="Filter Websites..."
                        value={
                            (table
                                .getColumn("name")
                                ?.getFilterValue() as string) ?? ""
                        }
                        onChange={(event) =>
                            table
                                .getColumn("name")
                                ?.setFilterValue(event.target.value)
                        }
                        className="max-w-full sm:max-w-sm"
                    />
                    <div className="flex gap-4">
                        <Input
                            ref={addProjectInput}
                            placeholder="Enter Project Name"
                        />
                        <Button
                            onClick={handleAddProject}
                            variant={"ghost"}
                            className="flex items-center"
                        >
                            <Plus />
                        </Button>
                    </div>
                </div>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                          header.column
                                                              .columnDef.header,
                                                          header.getContext()
                                                      )}
                                            </TableHead>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        className=" cursor-pointer"
                                        key={row.id}
                                        data-state={
                                            row.getIsSelected() && "selected"
                                        }
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-end space-x-2 py-4">
                    <div className="flex-1 text-sm text-muted-foreground">
                        {table.getFilteredSelectedRowModel().rows.length} of{" "}
                        {table.getFilteredRowModel().rows.length} row(s)
                        selected.
                    </div>
                    <div>
                        <Button
                            className={cn(
                                "cursor-pointer",
                                Object.keys(rowSelection).length !==
                                    data.length && " invisible"
                            )}
                            variant={"ghost"}
                            disabled={Object.keys(rowSelection).length === 0}
                        >
                            <Trash />
                            <span>Trash</span>
                        </Button>
                    </div>
                    <div className="space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Projects;
