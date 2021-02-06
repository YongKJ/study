package com.yongkj.study.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import com.yongkj.study.dto.UserDto;

@Mapper
public interface PbUserMapper {

	@Insert("INSERT INTO el_user (userUUID, userName, userPassword, userSex, userAge, userEmail, userHeadPortraitPath, userRegTime, admin) VALUES (#{userUUID}, #{userName}, #{userPassword}, #{userSex}, #{userAge}, #{userEmail}, #{userHeadPortraitPath}, #{userRegTime}, #{admin})")
	void addUser(UserDto userDto);
	
	@Select("SELECT * FROM el_user WHERE userName=#{userName}")
	UserDto getUserDtoByUserName(@Param("userName") String userName);
	
	@Select("SELECT * FROM el_user WHERE userUUID=#{userUUID}")
	UserDto getUserDtoByUserUUID(@Param("userUUID") String userUUID);
	
	@Select("SELECT * FROM el_user")
	List<UserDto> getUserDtosList();
	
	@Select("SELECT * FROM el_user WHERE userName=#{userName} AND userPassword=#{userPassword}")
	UserDto getUserDtoByUserNameAndUserPassword(@Param("userName") String userName, @Param("userPassword") String userPassword);

	@Update("UPDATE el_user SET userLoginTime=#{userLoginTime} WHERE userUUID=#{userUUID}")
	void modUserLoginTimeByUserUUID(@Param("userLoginTime") String userLoginTime, @Param("userUUID") String userUUID);
	
	@Update("UPDATE el_user SET userPassword=#{userPassword} WHERE userUUID=#{userUUID}")
	void modUserPasswordByUserUUID(@Param("userPassword") String userPassword, @Param("userUUID") String userUUID);
	
	@Delete("DELETE FROM el_user WHERE userUUID=#{userUUID}")
	void delUserDtoByUserUUID(@Param("userUUID") String userUUID);
	
}
