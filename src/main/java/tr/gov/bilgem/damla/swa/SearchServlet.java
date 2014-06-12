
package tr.gov.bilgem.damla.swa;

import java.io.IOException;
import java.util.UUID;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;


public class SearchServlet extends HttpServlet {



    //~ --- [CONSTRUCTORS] ---------------------------------------------------------------------------------------------

    public SearchServlet() {

    }



    //~ --- [METHODS] --------------------------------------------------------------------------------------------------

    @Override
    protected void doGet(final HttpServletRequest request, final HttpServletResponse response) throws ServletException,
        IOException {

        response.setContentType("text/html;charset=UTF-8");

        String query = request.getParameter("q");

        HttpSession session = request.getSession(true);
        session.setAttribute("q", query);

        String view  = "/WEB-INF/views/results.jsp";

        if (query == null || query.isEmpty()) {
            view = "/WEB-INF/views/search_form.jsp";
        }

        request.setAttribute("searchId", UUID.randomUUID().toString());
        request.getRequestDispatcher(view).forward(request, response);
    }
}
