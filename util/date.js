export function getFormattedDate(date) {
    // Kontrolloni nëse 'date' është një objekt Date, përndryshe konvertojeni
    const validDate = date instanceof Date ? date : new Date(date);
  
    // Nëse data është e vlefshme, kthejeni në formatin ISO, përndryshe ktheni një varg të zbrazët ose mesazh
    return isNaN(validDate) ? 'Datë jo e vlefshme' : validDate.toISOString().slice(0, 10);
  }
  

export function getDatePlusDays(date,days){
    return new Date(date.getFullYear(),date.getMonth(),date.getDate()+days);
}