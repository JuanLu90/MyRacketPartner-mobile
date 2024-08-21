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

export const normalizeDate = (dateString) => {
  const date = new Date(dateString);
  // Verifica si la fecha es válida
  return isNaN(date.getTime()) ? null : date;
};

export const calculateAge = (birthdate) => {
  const birthDate = new Date(birthdate);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  const dayDifference = today.getDate() - birthDate.getDate();

  // Ajustar la edad si el cumpleaños aún no ha ocurrido este año
  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--;
  }

  return age;
};
