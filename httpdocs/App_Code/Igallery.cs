using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;
using System.ServiceModel.Web;

// NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "Igallery" in both code and config file together.
[ServiceContract]
public interface Igallery
{
    [OperationContract]
    [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json)]
    List<Albums> BindAlbums(string SchoolAuth);

    [OperationContract]
    [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json)]
    List<Photos> BindPhotos(string Id);

    [OperationContract]
    [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json)]
    string Delete(string AlbumId);

    [OperationContract]
    [WebInvoke(Method = "POST", ResponseFormat = WebMessageFormat.Json)]
    string DeleteAlbum(string Id);
}

public class Albums
{
    public string AlbumId { get; set; }
    public string Name { get; set; }
    public string Date { get; set; }
}

public class Photos
{
    public string AlbumId { get; set; }
    public string Url { get; set; }
}
