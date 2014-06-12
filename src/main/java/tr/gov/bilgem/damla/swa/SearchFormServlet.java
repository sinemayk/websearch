
package tr.gov.bilgem.damla.swa;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.UUID;


public class SearchFormServlet extends HttpServlet {



    //~ --- [CONSTRUCTORS] ---------------------------------------------------------------------------------------------

    public SearchFormServlet() {

    }



    //~ --- [METHODS] --------------------------------------------------------------------------------------------------

    @Override
    protected void doGet(final HttpServletRequest request, final HttpServletResponse response) throws ServletException,
        IOException {

        response.setContentType("text/html;charset=UTF-8");
        request.getRequestDispatcher("/WEB-INF/views/search_form.jsp").forward(request, response);
    }
}
