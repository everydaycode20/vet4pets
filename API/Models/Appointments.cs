namespace API.Models
{
    public class Appointments
    {
        public int id { get; set; }

        public DateTime date { get; set; }

        public int pet { get; set; }

        public int owner { get; set; }

        public int type { get; set; }
    }
}
