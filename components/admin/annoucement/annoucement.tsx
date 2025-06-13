/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { ChevronDown, MailIcon, Search, Users} from "lucide-react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  // DialogDescription,
  // DialogClose,
} from "@/components/ui/dialog";

import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "../../ui/button";

// Import the Announcement type from the server component
import Image from "next/image";
import { Announcement } from "@/app/(dashboard)/(users)/admin/communications/announcement/page";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";

// Constants
const PAGE_SIZE = 10;

// Client-side data fetching function
const fetchAnnouncements = async (
  page: number
): Promise<{ data: Announcement[]; total: number }> => {
  return new Promise((resolve) =>
    setTimeout(() => {
      const total = 160;
      const data = Array.from({ length: PAGE_SIZE }, (_, i) => {
        const id = (page - 1) * PAGE_SIZE + i + 1;
        return {
          id,
          from: "Principal's Office",
          message:
            "School will close early on Friday, March 22nd for staff training. Ensure you arrange your transport accordingly.",
          date: "31 March 2025",
        };
      });
      resolve({ data, total });
    }, 500)
  );
};

type AnnouncementListClientProps = {
  viewers: {
    name: string;
    date: string;
    avatar: string;
  }[];
  modalContent: {
    title: string;
    content: string[];
  };
};

export function AnnouncementListClient({ viewers, modalContent }: AnnouncementListClientProps) {
  // State management
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Announcement | null>(null);
  const [open, setOpen] = useState(false);
  const [viewerSearchTerm, setViewerSearchTerm] = useState("");

  const totalPages = Math.ceil(total / PAGE_SIZE);

  // Fetch announcements when page changes
  useEffect(() => {
    setLoading(true);
    fetchAnnouncements(page).then((res) => {
      setAnnouncements(res.data.slice(0, 5)); // Show only 5 items per page
      setTotal(res.total);
      setLoading(false);
    });
  }, [page]);

  // Filter viewers based on search term
  const filteredViewers = viewers.filter(viewer => 
    viewer.name.toLowerCase().includes(viewerSearchTerm.toLowerCase())
  );

  // Calculate pagination display
  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (page <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", page, "...", totalPages);
      }
    }

    return pages;
  };

  return (
    <>
      {/* Announcement list with loading skeletons */}
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink  onClick={() => window.history.back()}>
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
                setSelected(a);
                setOpen(true);
              }}
              className="cursor-pointer flex justify-between items-start border rounded-md p-4 hover:bg-muted/40 transition"
            >
              <div className="flex items-start gap-3">
                <MailIcon className="mt-1 text-muted-foreground" size={16} />
                <div>
                  <p className="text-sm font-medium">{a.from}</p>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {a.message}
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground whitespace-nowrap">
                {a.date}
              </p>
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
                    onClick={() => typeof p === "number" && setPage(p)}
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
        <DialogContent className="sm:max-w-[800px] w-full max-w-[90vw] p-0 overflow-hidden shadow-xl rounded-lg">
          <DialogHeader className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <Image
                    src="/api/placeholder/40/40"
                    alt="Principal"
                    className="w-10 h-10 rounded-full object-cover border border-gray-200"
                    width={40}
                    height={40}
                  />
                </div>
                <div>
                  <DialogTitle className="text-lg font-medium">
                    {modalContent.title}
                  </DialogTitle>
                  <p className="text-sm text-gray-600">Principal&apos;s Office</p>
                </div>
              </div>

              <div className="flex items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center space-x-1 h-9"
                    >
                      <Users className="h-4 w-4 text-gray-500" />
                      <span>Seen</span>
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    </Button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="end"
                    className="w-64 max-h-64 overflow-y-auto rounded-md border border-gray-200 shadow-lg"
                    sideOffset={5}
                  >
                    <div className="p-2 sticky top-0 bg-white z-10 border-b">
                      <div className="relative">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search"
                          className="w-full bg-white border border-gray-200 pl-10 pr-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          value={viewerSearchTerm}
                          onChange={(e) => setViewerSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="divide-y">
                      {filteredViewers.map((viewer, index) => (
                        <DropdownMenuItem
                          key={index}
                          className="py-2 px-3 bg-white shadow-2xs hover:bg-gray-100 focus:bg-gray-100 flex items-center justify-between cursor-pointer"
                        >
                          <div className="flex items-center space-x-2">
                            <Image
                              src={viewer.avatar}
                              alt={viewer.name}
                              className="w-8 h-8 rounded-full object-cover border border-gray-100"
                              width={40}
                              height={40}
                            />
                            <span className="font-medium text-sm">
                              {viewer.name}
                            </span>
                          </div>
                          <span className="text-gray-500 text-xs">
                            {viewer.date}
                          </span>
                        </DropdownMenuItem>
                      ))}
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </DialogHeader>

          <div className="p-6 text-gray-700 max-h-96 overflow-y-auto">
            <div className="space-y-4 text-sm">
              {modalContent.content.map((paragraph, index) => (
                <p key={index}>
                  {paragraph.split('\n').map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < paragraph.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </p>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}