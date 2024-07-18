// Formatear la fecha en la hora local (Madrid, España)
export const formatDate = (date) => {
  const localDate = new Date(date);
  const madridOptions = {
    timeZone: "Europe/Madrid",
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  };
  const formattedDate = localDate.toLocaleString(undefined, madridOptions);

  return formattedDate;
};

export const formatHour = (date) => {
  const localDate = new Date(date);
  const madridOptions = {
    timeZone: "Europe/Madrid",
    hour: "2-digit",
    minute: "2-digit",
  };
  const formattedDate = localDate.toLocaleString(undefined, madridOptions);

  return formattedDate;
};

export const formatDateMySql = (date) => {
  // Obtener el desplazamiento de la zona horaria en minutos
  const offsetMinutes = date?.getTimezoneOffset();

  // Crear una nueva fecha ajustando por el desplazamiento
  const adjustedDate = new Date(date?.getTime() - offsetMinutes * 60000);

  // Convertir la fecha a formato DATETIME de MySQL
  const fechaEnFormatoMysql = adjustedDate
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  return fechaEnFormatoMysql;
};
