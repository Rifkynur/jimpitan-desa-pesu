import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type PaginationProps = {
  page: number;
  totalPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

export function PaginationComponent({
  page,
  totalPage,
  setPage,
}: PaginationProps) {
  // bikin array halaman (misalnya tampil 1 sebelum & 1 sesudah page aktif)
  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    if (totalPage <= 5) {
      // kalau halaman sedikit, tampilkan semua
      for (let i = 1; i <= totalPage; i++) pages.push(i);
    } else {
      if (page > 2) pages.push(1); // selalu tampilkan halaman 1
      if (page > 3) pages.push("ellipsis");

      for (
        let i = Math.max(1, page - 1);
        i <= Math.min(totalPage, page + 1);
        i++
      ) {
        pages.push(i);
      }

      if (page < totalPage - 2) pages.push("ellipsis");
      if (page < totalPage) pages.push(totalPage); // selalu tampilkan halaman terakhir
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <Pagination className="mt-2">
      <PaginationContent>
        {/* Previous */}
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (page > 1) setPage(page - 1);
            }}
          />
        </PaginationItem>

        {/* Numbered pages */}
        {pageNumbers.map((num, idx) => (
          <PaginationItem key={idx}>
            {num === "ellipsis" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href="#"
                isActive={page === num}
                onClick={(e) => {
                  e.preventDefault();
                  setPage(num);
                }}
              >
                {num}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        {/* Next */}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (page < totalPage) setPage(page + 1);
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
