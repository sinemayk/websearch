
package tr.gov.bilgem.damla.swa;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;


public class DeleteRecordServlet extends HttpServlet {


    //~ --- [CONSTRUCTORS] ---------------------------------------------------------------------------------------------

    public DeleteRecordServlet() {

    }


    //~ --- [METHODS] --------------------------------------------------------------------------------------------------

    @Override
    protected void doGet(final HttpServletRequest request, final HttpServletResponse response) throws ServletException,
            IOException {

        HttpSession session = request.getSession(true);
        String      query   = (String) session.getAttribute("q");
        // TODO: session yerine request olmalı

        String docId    = request.getParameter("docId");
        String searchId = request.getParameter("searchId");

        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection conn  = DriverManager.getConnection("jdbc:mysql://localhost/tez", "root", "root");
            String     sql = "";

            sql += "DELETE ";
            sql += "FROM SEARCH_RECORD ";
            sql += "WHERE ";
            sql += "  SEARCH_ID = ? ";
            sql += "  AND";
            sql += "  DOC_ID = ? ";

            PreparedStatement statement = conn.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);

            statement.setString(1, searchId);
            statement.setString(2, docId);

            statement.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}


