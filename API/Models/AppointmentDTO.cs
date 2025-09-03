namespace API.Models
{
    public class AppointmentDTO
    {
        public int Id { get; set; }

        public required DateTime Date { get; set; }

        public required DateTime EndDate { get; set; }

        public object? Pet { get; set; }

        public object? Owner { get; set; }

        public object? Type { get; set; }

        public Boolean? Completed { get; set; } = false;
    }
}
