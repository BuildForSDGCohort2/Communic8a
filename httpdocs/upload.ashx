<%@ WebHandler Language="C#" Class="upload" %>

using System;
using System.Web;
using System.IO;
using System.Web.Script.Serialization;
using System.Collections.Generic;
using System.Linq;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Text;
using System.Data;
using System.Data.SqlClient;

public class upload : IHttpHandler
{

    public void ProcessRequest(HttpContext context)
    {
        try
        {
            context.Response.ContentType = "text/plain";
            string id = context.Request.QueryString["id"].ToString();
            string auth = context.Request.QueryString["auth"].ToString();
            string name = context.Request.QueryString["name"].ToString();
            string date = context.Request.QueryString["date"].ToString();

            if (context.Request.QueryString["id"].ToString() != "")
            {

                string dirFullPath = HttpContext.Current.Server.MapPath("~/secure/gallery/");
                string[] files;
                int numFiles;

                string str_image = "";
                if ((context.Request.QueryString["id"].ToString() != ""))
                {

                    HttpFileCollection fil = context.Request.Files;
                    for (int s = 0; s < fil.Count; s++)
                    {
                        HttpPostedFile file = context.Request.Files[s];
                        string fileName = file.FileName;
                        string fileExtension = file.ContentType;
                        files = System.IO.Directory.GetFiles(dirFullPath);
                        numFiles = files.Length;
                        numFiles = numFiles + 1;


                        /////// Image Path Get ///////

                        fileExtension = Path.GetExtension(fileName);
                        //string albumid =id.Replace(@"-", "_");
                        str_image = id + "_" + numFiles.ToString() + fileExtension;

                        /////// Image Path Get End ///////

                        string pathToSave = HttpContext.Current.Server.MapPath("~/secure/gallery/") + str_image;
                        file.SaveAs(pathToSave);

                        // img size  ////
                        System.Drawing.Image img = System.Drawing.Image.FromStream(file.InputStream);
                        int height = img.Height;
                        int width = img.Width;
                        decimal size = Math.Round(((decimal)file.ContentLength / (decimal)1024), 2);

                        // image size end   //

                        SqlConnection con = new SqlConnection(System.Configuration.ConfigurationManager.ConnectionStrings["constr"].ToString());
                        con.Open();
                        SqlCommand cmd = new SqlCommand("insert into Albums(Name,Date,Url,SchoolAuth,Id) values('" + name + "','" + date + "','" + "http://www.communic8a.co.za/secure/gallery/" + str_image.ToString() + "','" + auth + "','" + id + "')", con);
                        cmd.ExecuteNonQuery();

                        context.Response.Write(str_image);

                    }

                }
            }
        }
        catch (Exception ex)
        {

            context.Response.Write("ERROR: " + ex.Message);
        }
    }




    public bool IsReusable
    {
        get
        {
            return false;
        }


    }



}