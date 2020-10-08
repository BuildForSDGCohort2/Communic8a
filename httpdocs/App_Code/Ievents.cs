using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using System.ServiceModel.Web;

// NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "Ievents" in both code and config file together.
[ServiceContract]
public interface Ievents
{
    [OperationContract]
    [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json)]
    List<Events> BindDates(string SchoolAuth);

    [OperationContract]
    [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json)]
    List<EventDates> BindEvents(string Date, string SchoolAuth);

    [OperationContract]
    [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json)]
    string Delete(string EventId);

    [OperationContract]
    [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json)]
    string Update(string Title, string Description, string Date, string Venue, string EventId);

    [OperationContract]
    [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json)]
    string UpdateImage(string Title, string Description, string Date, string Venue, string Poster, string EventId);

    [OperationContract]
    [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json)]
    string Create(string Title, string Description, string Date, string Venue, string SchoolAuth);

    [OperationContract]
    [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json)]
    string CreateImage(string Title, string Description, string Date, string Venue, string Poster, string SchoolAuth);

    [OperationContract]
    [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json)]
    List<EventData> Edit(string EventId);
}

public class Events
{
    public string date { get; set; }
    public string badge { get; set; }
    public string title { get; set; }
}

public class EventDates
{
    public string EventId { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public string Date { get; set; }
    public string Venue { get; set; }
    public string Poster { get; set; }
}

public class EventData
{
    public string Title { get; set; }
    public string Description { get; set; }
    public string Date { get; set; }
    public string Venue { get; set; }
    public string Poster { get; set; }
}
