<%@ WebHandler Language="C#" Class="excel" %>
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.OleDb;
using System.Data;
using System.Configuration;
using System.Net;
using System.IO;
using Newtonsoft.Json;


public class excel : IHttpHandler
{
    //return json to client
    public void ProcessRequest (HttpContext context) {
        var json = convert();
        context.Response.Write(json);
       }
    
    //Convert Excel to Json
    public string convert(){

        var client = new WebClient();

        string url = "http://www.communic8a.co.za/Data.xlsx";
        var fullPath = Path.GetTempFileName();
        client.DownloadFile(url, fullPath);
        string conStr = ConfigurationManager.ConnectionStrings["Excel07ConString"].ConnectionString;
        string connectionString = string.Format(conStr, fullPath, true);


        DataSet data = new DataSet();
        var dataTable = new DataTable();
        foreach (var sheetName in GetExcelSheetNames(connectionString))
        {
            using (OleDbConnection con = new OleDbConnection(connectionString))
            {

                string query = string.Format("SELECT * FROM [{0}]", sheetName);
                con.Open();
                OleDbDataAdapter adapter = new OleDbDataAdapter(query, con);
                adapter.Fill(dataTable);
                data.Tables.Add(dataTable);
            }
        }
        string JSONresult;
        JSONresult = JsonConvert.SerializeObject(dataTable);
        return JSONresult; //Returning Datable 
    }

    static string[] GetExcelSheetNames(string connectionString)
    {
        OleDbConnection con = null;
        DataTable dt = null;
        con = new OleDbConnection(connectionString);
        con.Open();
        dt = con.GetOleDbSchemaTable(OleDbSchemaGuid.Tables, null);

        if (dt == null)
        {
            return null;
        }

        String[] excelSheetNames = new String[dt.Rows.Count];
        int i = 0;

        foreach (DataRow row in dt.Rows)
        {
            excelSheetNames[i] = row["TABLE_NAME"].ToString();
            i++;
        }

        return excelSheetNames;
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}