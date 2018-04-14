package <%= packageName %>.service.<%= subPackageName %>;

import <%= packageName %>.controller.mapstruct.<%= subPackageName %>.<%= domainName %>MapStruct;
import <%= packageName %>.domain.<%= subPackageName %>.<%= domainName %>;
import <%= packageName %>.domain.<%= subPackageName %>.dto.<%= domainName %>Dto;
import <%= packageName %>.mapper.<%= subPackageName %>.<%= domainName %>Mapper;
import <%= packageName %>.security.SecurityUtils;
import <%= packageName %>.utils.*;
import <%= packageName %>.utils.exception.ApplicationErrorEnum;
import <%= packageName %>.utils.exception.Preconditions;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional(rollbackFor = Exception.class)
public class <%= domainName %>Service {
    private final Logger logger = LoggerFactory.getLogger(<%= domainName %>Service.class);

    @Autowired
    <%= domainName %>Mapper <%= lowerDomainName %>Mapper;

    @Autowired
    <%= domainName %>MapStruct <%= lowerDomainName %>MapStruct;

    /**
     * 写入记录
     *
     *
     * @param record { @link <%= domainName %>Dto }
     *
     * @return int
     */
    public int insert(<%= domainName %>Dto record) {
        <%= domainName %> <%= lowerDomainName %> = <%= lowerDomainName %>MapStruct.toEntity(record);

        Integer userId = SecurityUtils.getCurrentUserId();
        <%= lowerDomainName %>.setDeleteFlag(DeleteFlagEnum.NOT_DELETED.getStatus());
        <%= lowerDomainName %>.setCreatedTime(new Date());
        <%= lowerDomainName %>.setCreatedBy(userId);
        <%= lowerDomainName %>.setLastModifiedBy(userId);
        <%= lowerDomainName %>.setLastModifiedTime(new Date());

        int num = <%= lowerDomainName %>Mapper.insert(<%= lowerDomainName %>);
        Preconditions.checkArgument(num > 0, ApplicationErrorEnum.COMMON_FAIL);

        return num;
    }

    /**
     * 批量写入记录
     *
     *
     * @param records { @link List<<%= domainName %>Dto> }
     *
     * @return int
     */
    public int insertBatch(List<<%= domainName %>Dto> records) {
        List<<%= domainName %>> recordList = <%= lowerDomainName %>MapStruct.toEntity(records);

        Integer userId = SecurityUtils.getCurrentUserId();
        recordList.forEach(record -> {
            record.setDeleteFlag(DeleteFlagEnum.NOT_DELETED.getStatus());
            record.setCreatedTime(new Date());
            record.setCreatedBy(userId);
            record.setLastModifiedBy(userId);
            record.setLastModifiedTime(new Date());
        });

        int num = <%= lowerDomainName %>Mapper.insertList(recordList);
        Preconditions.checkArgument(num == recordList.size(), ApplicationErrorEnum.COMMON_FAIL);

        return num;
    }

    /**
     * 根据主键-ID查询
     *
     *
     * @param id { @link Integer }
     *
     * @return { @link <%= domainName %>Dto }
     */
    public <%= domainName %>Dto selectByPrimaryKey(Integer id) {

        <%= domainName %> <%= lowerDomainName %> = <%= lowerDomainName %>Mapper.selectByPrimaryKey(id);
        Preconditions.checkNotNull(<%= lowerDomainName %>, ApplicationErrorEnum.COMMON_DATA_NOT_FOUND);

        return <%= lowerDomainName %>MapStruct.toDto(<%= lowerDomainName %>);
    }

    /**
     * 根据字段选择性查询
     *
     *
     * @param record { @link <%= domainName %>Dto }
     *
     * @return { @link List<<%= domainName %>Dto> }
     */
    public List<<%= domainName %>Dto> selectSelective(<%= domainName %>Dto record) {
        <%= domainName %> <%= lowerDomainName %> = <%= lowerDomainName %>MapStruct.toEntity(record);

        List<<%= domainName %>> <%= lowerDomainName %>List = <%= lowerDomainName %>Mapper.select(<%= lowerDomainName %>);
        return <%= lowerDomainName %>MapStruct.toDto(<%= lowerDomainName %>List);
    }

    /**
     * 根据主键更新
     *
     *
     * @param record { @link <%= domainName %>Dto }
     *
     * @return int
     */
    public int updateByPrimaryKey(<%= domainName %>Dto record) {
        <%= domainName %> <%= lowerDomainName %> = <%= lowerDomainName %>MapStruct.toEntity(record);

        Integer userId = SecurityUtils.getCurrentUserId();
        <%= lowerDomainName %>.setLastModifiedBy(userId);
        <%= lowerDomainName %>.setLastModifiedTime(new Date());

        int num = <%= lowerDomainName %>Mapper.updateByPrimaryKey(<%= lowerDomainName %>);
        Preconditions.checkArgument(num ==1, ApplicationErrorEnum.COMMON_FAIL);

        return num;

    }

    /**
     * 根据主键选择性更新
     *
     *
     * @param record { @link <%= domainName %>Dto }
     *
     * @return int
     */
    public int updateByPrimaryKeySelective(<%= domainName %>Dto record) {
        <%= domainName %> <%= lowerDomainName %> = <%= lowerDomainName %>MapStruct.toEntity(record);

        Integer userId = SecurityUtils.getCurrentUserId();
        <%= lowerDomainName %>.setLastModifiedBy(userId);
        <%= lowerDomainName %>.setLastModifiedTime(new Date());

        int num = <%= lowerDomainName %>Mapper.updateByPrimaryKeySelective(<%= lowerDomainName %>);
        Preconditions.checkArgument(num ==1, ApplicationErrorEnum.COMMON_FAIL);

        return num;
    }

    /**
     * 根据主键删除记录
     *
     *
     * @param id { @link Integer }
     *
     * @return int
     */
    public int deleteByPrimaryKey(Integer id) {
        int num = <%= lowerDomainName %>Mapper.deleteByPrimaryKey(id);
        Preconditions.checkArgument(num == 1, ApplicationErrorEnum.COMMON_FAIL);

        return num;
    }

    /**
     * 根据主键逻辑删除记录
     *
     *
     * @param id { @link Integer }
     *
     * @return int
     */
    public int deleteLogicByPrimaryKey(Integer id) {
        return <%= lowerDomainName %>Mapper.deleteLogicByPrimaryKey(id);
    }

    /**
     * 根据主键删除多条记录
     *
     *
     * @param ids { @link List<String> }
     *
     * @return int
     */
    public int deleteMore(List<String> ids){
        return <%= lowerDomainName %>Mapper.deleteByIds(String.join(",", ids));
    }

    /**
     * 根据主键逻辑删除多条记录
     *
     *
     * @param ids { @link List<String> }
     *
     * @return int
     */
    public int deleteMoreLogic(List<String> ids){
        return <%= lowerDomainName %>Mapper.deleteLogicByIds(String.join(",", ids));
    }

    /**
     * 根据条件分页查询
     *
     *
     * @param gridPageRequest { @link GridPageRequest }
     *
     * @return { @link GridReturnData<<%= domainName %>Dto> }
     */
    public GridReturnData<<%= domainName %>Dto> selectPage(GridPageRequest gridPageRequest){
        Integer user_id= SecurityUtils.getCurrentUserId();

        GridReturnData<<%= domainName %>Dto> mGridReturnData = new GridReturnData<>();
        List<GridFilterInfo> filterList = gridPageRequest.getFilterList();
        Map map = new HashMap();
        filterList.stream().forEach(gridFilterInfo ->{//封装筛选条件
            if(gridFilterInfo.getFilterKey() != null && gridFilterInfo.getFilterValue() != null){
                map.put(gridFilterInfo.getFilterKey(), gridFilterInfo.getFilterValue());
            }
        });
        map.put("searchKey", gridPageRequest.getSearchKey());
        //对map中的参数的合法性进行校验

        String sortMyBatisByString = gridPageRequest.getSortMybatisString();
        PageHelper.startPage(gridPageRequest.getPageNum(), gridPageRequest.getPageSize(), sortMyBatisByString);

        List<<%= domainName %>> list = <%= lowerDomainName %>Mapper.selectPage(map);

        PageInfo<<%= domainName %>> pageInfo = new PageInfo<>(list);
        PageInfo<<%= domainName %>Dto> pageInfoFinal = new PageInfo<>(<%= lowerDomainName %>MapStruct.toDto(list));
        pageInfoFinal.setTotal(pageInfo.getTotal());
        mGridReturnData.setPageInfo(pageInfoFinal);

        return mGridReturnData;
    }
}
