using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using System.ServiceModel.Web;

// NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "Inotifications" in both code and config file together.
[ServiceContract]
public interface Inotifications
{
    [OperationContract]
    [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json)]
    List<Notifications> BindNotifications(string SchoolAuth);

    [OperationContract]
    [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json)]
    string SendNotification(string Title, string Message, string SchoolAuth);
}

public class Notifications
{
    public string NotificationId { get; set; }
    public string Title { get; set; }
    public string Message { get; set; }
    public string Date { get; set; }
}

public class Tokens
{
    public string TokenId { get; set; }
}