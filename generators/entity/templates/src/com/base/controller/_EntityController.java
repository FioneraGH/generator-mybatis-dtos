package <%= packageName %>.controller.<%= subPackageName %>;

import java.util.List;

<% if(!useLombok){ %>import org.springframework.beans.factory.annotation.Autowired;<% } %>
import org.springframework.web.bind.annotation.*;

import <%= packageName %>.domain.<%= subPackageName %>.dto.<%= domainName %>DTO;
import <%= packageName %>.service.<%= subPackageName %>.<%= domainName %>Service;
import <%= packageName %>.utils.GridPageRequest;
import <%= packageName %>.utils.GridReturnData;
import <%= packageName %>.utils.Result;

<% if(useLombok){ %>import lombok.RequiredArgsConstructor;<% } %>

/**
 * 对<%= domainName %>的操作
 *
 *
 * @version        Enter version here..., 17/10/11
 * @author         Enter your name here...
 */
@RestController
@RequestMapping("/api/<%= underScoreCaseDomainName %>")
<% if(useLombok){ %>@RequiredArgsConstructor<% } %>
public class <%= domainName %>Controller {
<% if(useLombok){ %>    private final <%= domainName %>Service <%= lowerDomainName %>Service;
<% } else {%>
    @Autowired
    private <%= domainName %>Service <%= lowerDomainName %>Service;
<% } %>

    /**
     * 根据主键ID删除
     *
     *
     * @param id {@link Integer }
     *
     * @return {@link Result }
     */
    @DeleteMapping(value = "/{id}")
    public Result deleteByPrimaryKey(@PathVariable Integer id) {
        <%= lowerDomainName %>Service.deleteByPrimaryKey(id);

        return new Result();
    }

    /**
     * 根据主键ID删除多条记录
     *
     *
     * @param ids {@link List<String> }
     *
     * @return {@link Result }
     */
    @DeleteMapping
    public Result deleteMoreByIds(@RequestBody List<String> ids) {
        <%= lowerDomainName %>Service.deleteMore(ids);

        return new Result();
    }

    /**
     * 新增记录
     *
     *
     * @param <%= lowerDomainName %>DTO {@link <%= domainName %>DTO }
     *
     * @return {@link Result }
     */
    @PostMapping
    public Result insert(@RequestBody <%= domainName %>DTO <%= lowerDomainName %>DTO) {
        <%= lowerDomainName %>Service.insert(<%= lowerDomainName %>DTO);

        return new Result();
    }

    /**
     * 根据主键查询记录
     *
     *
     * @param id {@link Integer }
     *
     * @return {@link Result }
     */
    @GetMapping(value = "/{id}")
    public Result selectByPrimaryKey(@PathVariable Integer id) {
        <%= domainName %>DTO <%= lowerDomainName %>DTO = <%= lowerDomainName %>Service.selectByPrimaryKey(id);

        return new Result(<%= lowerDomainName %>DTO);
    }

    /**
     * 分页查询记录
     *
     *
     * @param gridPageRequest {@link GridPageRequest }
     *
     * @return {@link Result }
     */
    @PostMapping(value = "/page")
    public Result selectPage(@RequestBody GridPageRequest gridPageRequest) {
        GridReturnData<<%= domainName %>DTO> records = <%= lowerDomainName %>Service.selectPage(gridPageRequest);

        return new Result(records);
    }

    /**
     * 更新记录
     *
     *
     * @param <%= lowerDomainName %>DTO {@link <%= domainName %>DTO }
     *
     * @return {@link Result }
     */
    @PutMapping
    public Result updateByPrimaryKey(@RequestBody <%= domainName %>DTO <%= lowerDomainName %>DTO) {
        <%= lowerDomainName %>Service.updateByPrimaryKey(<%= lowerDomainName %>DTO);

        return new Result();
    }
}
