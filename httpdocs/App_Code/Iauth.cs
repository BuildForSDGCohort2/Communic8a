using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using System.ServiceModel.Web;

// NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "Iauth" in both code and config file together.
[ServiceContract]
public interface Iauth
{
    [OperationContract]
    [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json)]
    List<SchoolProfile> BindProfile(string SchoolAuth);

    [OperationContract]
    [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json)]
    string DeleteLogo(string SchoolAuth);
   
    [OperationContract]
    [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json)]
    string Update(string Name, string Phone, string Email, string Address, string Website, string SchoolAuth, string MerchantId);

    [OperationContract]
    [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json)]
    string UpdateImage(string Name, string Phone, string Email, string Address, string Logo, string Website, string SchoolAuth, string MerchantId);

    [OperationContract]
    [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json)]
    string Enquiry(string Name, string Email, string Msg);

    [OperationContract]
    [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json)]
    List<Summary> BindSummary(string SchoolAuth);
}

public class SchoolProfile
{
    public string Name { get; set; }
    public string Phone { get; set; }
    public string Email { get; set; }
    public string Address { get; set; }
    public string Website { get; set; }
    public string Logo { get; set; }
    public string MerchantId { get; set; }
}

public class Summary
{
    public string Students { get; set; }
    public string Events { get; set; }
    public string Galleries { get; set; }
    public string Payments { get; set; }
    public string Notifications { get; set; }
}