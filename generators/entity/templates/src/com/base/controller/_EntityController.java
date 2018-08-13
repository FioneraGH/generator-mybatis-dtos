package <%= packageName %>.controller.<%= subPackageName %>;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import <%= packageName %>.controller.mapstruct.<%= subPackageName %>.<%= domainName %>MapStruct;
import <%= packageName %>.domain.<%= subPackageName %>.<%= domainName %>;
import <%= packageName %>.domain.<%= subPackageName %>.dto.<%= domainName %>Dto;
import <%= packageName %>.service.<%= subPackageName %>.<%= domainName %>Service;
import <%= packageName %>.utils.GridPageRequest;
import <%= packageName %>.utils.GridReturnData;
import <%= packageName %>.utils.Result;

/**
 * 对<%= domainName %>的操作
 *
 *
 * @version        Enter version here..., 17/10/11
 * @author         Enter your name here...
 */
@RestController
@RequestMapping("/api/<%= underScoreCaseDomainName %>")
public class <%= domainName %>Controller {
    @Autowired
    <%= domainName %>Service   <%= lowerDomainName %>Service;
    @Autowired
    <%= domainName %>MapStruct <%= lowerDomainName %>MapStruct;

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
     * @param <%= lowerDomainName %>Dto {@link <%= domainName %>Dto }
     *
     * @return {@link Result }
     */
    @PostMapping
    public Result insert(@RequestBody <%= domainName %>Dto <%= lowerDomainName %>Dto) {
        <%= lowerDomainName %>Service.insert(<%= lowerDomainName %>Dto);

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
        <%= domainName %>Dto <%= lowerDomainName %>Dto = <%= lowerDomainName %>Service.selectByPrimaryKey(id);

        return new Result(<%= lowerDomainName %>Dto);
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
        GridReturnData<<%= domainName %>Dto> records = <%= lowerDomainName %>Service.selectPage(gridPageRequest);

        return new Result(records);
    }

    /**
     * 更新记录
     *
     *
     * @param <%= lowerDomainName %>Dto {@link <%= domainName %>Dto }
     *
     * @return {@link Result }
     */
    @PutMapping
    public Result updateByPrimaryKey(@RequestBody <%= domainName %>Dto <%= lowerDomainName %>Dto) {
        <%= lowerDomainName %>Service.updateByPrimaryKey(<%= lowerDomainName %>Dto);

        return new Result();
    }
}
