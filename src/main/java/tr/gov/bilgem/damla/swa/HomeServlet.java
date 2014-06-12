
package tr.gov.bilgem.damla.swa;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;



public class HomeServlet extends HttpServlet {



    //~ --- [CONSTRUCTORS] ---------------------------------------------------------------------------------------------

    public HomeServlet() {

    }



    //~ --- [METHODS] --------------------------------------------------------------------------------------------------

    @Override
    protected void doGet(final HttpServletRequest request, final HttpServletResponse response) throws ServletException,
        IOException {

        response.setContentType("text/html;charset=UTF-8");
        request.getRequestDispatcher("/WEB-INF/views/login.jsp").forward(request, response);
    }
}
