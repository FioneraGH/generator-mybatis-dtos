package <%= packageName %>.controller.mapstruct.<%= subPackageName %>;

import <%= packageName %>.controller.mapstruct.EntityMapper;
import <%= packageName %>.domain.<%= subPackageName %>.<%= domainName %>;
import <%= packageName %>.domain.<%= subPackageName %>.dto.<%= domainName %>Dto;
import org.mapstruct.Mapper;

/**
 * Mapper for the entity <%= domainName %> and its DTO <%= domainName %>Dto.
 */
@Mapper(componentModel = "spring", uses = {})
public interface <%= domainName %>MapStruct extends EntityMapper<<%= domainName %>Dto, <%= domainName %>> {

}
