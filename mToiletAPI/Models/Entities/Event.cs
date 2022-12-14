namespace mToiletAPI.Models.Entities
{
    public class Event
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public virtual User User { get; set; }
        public virtual Device Device { get; set; }
    }
}