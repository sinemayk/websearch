
package tr.gov.bilgem.damla.swa;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.sql.*;


public class InsertRecordServlet extends HttpServlet {


    //~ --- [CONSTRUCTORS] ---------------------------------------------------------------------------------------------

    public InsertRecordServlet() {

    }


    //~ --- [METHODS] --------------------------------------------------------------------------------------------------

    @Override
    protected void doGet(final HttpServletRequest request, final HttpServletResponse response)
            throws ServletException, IOException {

        HttpSession session = request.getSession(true);
        String      query   = (String) session.getAttribute("q");
        // TODO: session yerine request olmalı

        String name      = (String) session.getAttribute("isim");
        String surname   = (String) session.getAttribute("soyisim");
        String docId     = request.getParameter("docId");
        String orderInfo = request.getParameter("orderInfo");
        String searchId  = request.getParameter("searchId");
        String solrId    = request.getParameter("solrId");

        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection conn  = DriverManager.getConnection("jdbc:mysql://localhost/tez", "root", "root");
            String     sql = "";

            sql += "INSERT INTO SEARCH_RECORD (";
            sql += "  SEARCH_ID,";
            sql += "  SEARCH_TERM,";
            sql += "  DOC_ID,";
            sql += "  ORDER_INFO,";
            sql += "  NAME,";
            sql += "  SURNAME";
            sql += "  NUM_SOLR_RESULT";
            sql += ") VALUES (?, ?, ?, ?, ?, ?, ?)";

            PreparedStatement statement = conn.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);

            statement.setString(1, searchId);
            statement.setString(2, query);
            statement.setString(3, docId);
            statement.setString(4, orderInfo);
            statement.setString(5, name);
            statement.setString(6, surname);
            statement.setString(7, solrId);

            statement.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}


