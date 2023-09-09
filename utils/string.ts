export const formatCurrency = (amount: number) => {
  return `${amount.toLocaleString("id-ID")}`;
};

export const formatDate = (inputDate: string) => {
  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const date = new Date(inputDate);

  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');

  const formattedDate = `${day} ${month} ${year} ${hour}:${minute}`;

  const finalFormattedDate = `${formattedDate} WIB`;

  return finalFormattedDate;
};
