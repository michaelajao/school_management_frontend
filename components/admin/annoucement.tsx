import { useEffect, useState } from "react"
import { MailIcon } from "lucide-react"

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose,
  } from "@/components/ui/dialog"
  

import { Skeleton } from "@/components/ui/skeleton"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "../ui/breadcrumb"


type Announcement = {
  id: number
  from: string
  message: string
  date: string
}

const PAGE_SIZE = 10

const fetchAnnouncements = async (page: number): Promise<{ data: Announcement[]; total: number }> => {
  return new Promise((resolve) =>
    setTimeout(() => {
      const total = 160
      const data = Array.from({ length: PAGE_SIZE }, (_, i) => {
        const id = (page - 1) * PAGE_SIZE + i + 1
        return {
          id,
          from: "Principal's Office",
          message:
            "School will close early on Friday, March 22nd for staff training. Ensure you arrange your transport accordingly.",
          date: "31 March 2025",
        }
      })
      resolve({ data, total })
    }, 500)
  )
}



export function AnnouncementList() {
    const [announcements, setAnnouncements] = useState<Announcement[]>([])
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(true)
    const [selected, setSelected] = useState<Announcement | null>(null)
    const [open, setOpen] = useState(false)
  
    const totalPages = Math.ceil(total / PAGE_SIZE)
  
    useEffect(() => {
      setLoading(true)
      fetchAnnouncements(page).then((res) => {
        setAnnouncements(res.data.slice(0, 5)) // 5 displayed
        setTotal(res.total)
        setLoading(false)
      })
    }, [page])
  
    const getPageNumbers = () => {
      const pages: (number | "...")[] = []
      const maxVisible = 5
  
      if (totalPages <= maxVisible) {
        for (let i = 1; i <= totalPages; i++) pages.push(i)
      } else {
        if (page <= 3) {
          pages.push(1, 2, 3, "...", totalPages)
        } else if (page >= totalPages - 2) {
          pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages)
        } else {
          pages.push(1, "...", page, "...", totalPages)
        }
      }
  
      return pages
    }
  
    return (
      <div className="space-y-4">
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="#" onClick={() => window.history.back()}>
              Go Back
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
  
        {loading
          ? Array.from({ length: 5 }).map((_, idx) => (
              <Skeleton key={idx} className="h-20 w-full rounded-md" />
            ))
          : announcements.map((a) => (
              <div
                key={a.id}
                onClick={() => {
                  setSelected(a)
                  setOpen(true)
                }}
                className="cursor-pointer flex justify-between items-start border rounded-md p-4 hover:bg-muted/40 transition"
              >
                <div className="flex items-start gap-3">
                  <MailIcon className="mt-1 text-muted-foreground" size={16} />
                  <div>
                    <p className="text-sm font-medium">{a.from}</p>
                    <p className="text-sm text-muted-foreground line-clamp-2">{a.message}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground whitespace-nowrap">{a.date}</p>
              </div>
            ))}
  
        {/* Pagination */}
        <div className="flex justify-end mt-6">
          <Pagination>
            <PaginationContent>
              {page > 1 && (
                <PaginationItem>
                  <PaginationPrevious onClick={() => setPage(page - 1)} />
                </PaginationItem>
              )}
  
              {getPageNumbers().map((p, i) => (
                <PaginationItem key={i}>
                  {p === "..." ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink
                      isActive={page === p}
                      onClick={() => setPage(p)}
                      href="#"
                    >
                      {p}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}
  
              {page < totalPages && (
                <PaginationItem>
                  <PaginationNext onClick={() => setPage(page + 1)} />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </div>
  
        {/* Modal for full message */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>{selected?.from}</DialogTitle>
              <DialogDescription>{selected?.date}</DialogDescription>
            </DialogHeader>
            <div className="py-2 text-sm text-muted-foreground whitespace-pre-wrap">
              {selected?.message}
            </div>
            <DialogClose className="mt-4 inline-flex items-center justify-center px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
              Close
            </DialogClose>
          </DialogContent>
        </Dialog>
      </div>
    )
  }
  
