interface dateProp {
    dateString: string;
}
const dateFunction = ({dateString}: dateProp) => {
    if (!dateString) return "Invalid Date";

    // console.log("Date format previous:", dateString);

    const dateObj = new Date(dateString);
    if (isNaN(dateObj.getTime())) {
        console.error("Invalid date format:", dateString);
        return "Invalid Date";
    }

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const day = dateObj.getDate();
    const month = months[dateObj.getMonth()];
    const year = dateObj.getFullYear();
    const formattedDate = `${day} ${month} ${year}`;

    // console.log("Formatted date:", formattedDate);
    return formattedDate;
};

export default dateFunction;
