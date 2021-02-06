package com.yongkj.study.service;

import java.util.List;

import com.yongkj.study.dto.UserDto;

public interface UserService {
	
	void addUser(UserDto userDto);
	
	UserDto getUserDtoByUserUUID(String userUUID);
	
	List<UserDto> getUserDtosList();
	
	UserDto getUserDtoByUserName(String userName);
	
	UserDto getUserDtoByUserNameAndUserPassword(String userName, String userPassword);
	
	void modUserLoginTimeByUserUUID(String userLoginTime, String userUUID);
	
	void modUserPasswordByUserUUID(String userPassword, String userUUID);
	
	void delUserDtoByUserUUID(String userUUID);

}
