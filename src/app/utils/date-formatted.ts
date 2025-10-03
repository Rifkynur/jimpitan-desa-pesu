// fungsi untuk format tanggal 12 juli 2025
export const formatDate = (dateParam: string | Date) => {
  const date = new Date(dateParam); // bisa string atau Date
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};
