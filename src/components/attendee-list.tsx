import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal, Search } from "lucide-react"
import { IconButton } from "./icon-button"
import { Table } from "./table/table"
import { TableHeader } from "./table/table-header"
import { TableData } from "./table/table-data"
import { TableRow } from "./table/table-row"
import { ChangeEvent, useEffect, useState } from "react"
import dayjs from "dayjs"
import "dayjs/locale/pt-br";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

export function AttendeeList() {
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1);
    const [attendees, setAttendees] = useState([])

    const totalPages = Math.ceil(attendees.length / 10);

    useEffect(() => {
        fetch('http://localhost:3333/event/9e9bd979-9d10-4915-b339-3786b1634f33/attendees')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setAttendees(data.attendees)
        })
    }, [page])

    function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>) {
        setSearch(event.target.value)
    }

    function goToFirstPage() {
        setPage(1);
    }

    function goToLastPage() {
        setPage(totalPages);
    }

    function goToPreviousPage() {
        setPage(page - 1);
    }

    function goToNextPage() {
        setPage(page + 1);
    }

    return (
        <div className="flex flex-col gap-4">

            <div className="flex gap-3 items-center">
                <h1 className="text-2xl font-bold">Participantes</h1>
                <div className="flex items-center px-3 py-1.5 w-72 border border-white/10 rounded-lg gap-3">
                    <Search className="size-4 text-emerald-300" />
                    <input onChange={onSearchInputChanged} className="bg-transparent flex-1 outline-none border-0 text-sm p-0" placeholder="Buscar participante..." />
                </div>
                {search}
            </div>

            <Table>
                <thead>
                    <tr className="border-b border-white/10">
                        <TableHeader style={{ width: 48 }} >
                            <input type="checkbox" className="size-4 bg-black/20 rounded border border-white/10" />
                        </TableHeader>
                        <TableHeader>Código</TableHeader>
                        <TableHeader>Participante</TableHeader>
                        <TableHeader>Data de Inscrição</TableHeader>
                        <TableHeader>Data do Check-In</TableHeader>
                        <TableHeader style={{ width: 64 }} ></TableHeader>
                    </tr>
                </thead>
                <tbody>
                    {attendees.slice((page - 1) * 10, page * 10).map((attendees) => {
                        return (
                            <TableRow key={attendees.id}>
                                <TableData>
                                    <input type="checkbox" className="size-4 bg-black/20 rounded border border-white/10" />
                                </TableData>
                                <TableData>{attendees.id}</TableData>
                                <TableData>
                                    <div className="flex flex-col gap-1">
                                        <span className="font-semibold text-white">{attendees.name}</span>
                                        <span>{attendees.email}</span>
                                    </div>
                                </TableData>
                                <TableData>{dayjs().to(attendees.createdAt)}</TableData>
                                <TableData>{dayjs().to(attendees.checkedInAt)}</TableData>
                                <TableData>
                                    <IconButton transparent>
                                        <MoreHorizontal />
                                    </IconButton>
                                </TableData>
                            </TableRow>
                        )
                    })}
                </tbody>
                <tfoot>
                    <tr>
                        <TableData colSpan={3}>
                            Mostrando 10 de {attendees.length} itens
                        </TableData>
                        <TableData textRight colSpan={3}>
                            <div className="inline-flex items-center gap-8">
                                <span>Página {page} de {totalPages}</span>
                                <div className="flex gap-1.5">
                                    <IconButton onClick={goToFirstPage} disabled={page === 1}>
                                        <ChevronsLeft className="size-4" />
                                    </IconButton>
                                    <IconButton onClick={goToPreviousPage} disabled={page === 1}>
                                        <ChevronLeft className="size-4" />
                                    </IconButton>
                                    <IconButton
                                        onClick={goToNextPage}
                                        disabled={page === totalPages}
                                    >
                                        <ChevronRight className="size-4" />
                                    </IconButton>
                                    <IconButton
                                        onClick={goToLastPage}
                                        disabled={page === totalPages}
                                    >
                                        <ChevronsRight className="size-4" />
                                    </IconButton>
                                </div>
                            </div>
                        </TableData>
                    </tr>
                </tfoot>
            </Table>
        </div>
    )
}