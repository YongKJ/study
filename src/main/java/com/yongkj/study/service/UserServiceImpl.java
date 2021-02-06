package com.yongkj.study.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.yongkj.study.dto.UserDto;
import com.yongkj.study.mapper.PbUserMapper;

@Service("userService")
public class UserServiceImpl implements UserService {
	
	@Autowired
	private PbUserMapper pbUserMapper;

	public void addUser(UserDto userDto) {
		pbUserMapper.addUser(userDto);
	}

	public UserDto getUserDtoByUserName(String userName) {
		return pbUserMapper.getUserDtoByUserName(userName);
	}

	public UserDto getUserDtoByUserNameAndUserPassword(String userName, String userPassword) {
		return pbUserMapper.getUserDtoByUserNameAndUserPassword(userName, userPassword);
	}

	public void modUserLoginTimeByUserUUID(String userLoginTime, String userUUID) {
		pbUserMapper.modUserLoginTimeByUserUUID(userLoginTime, userUUID);
	}

	@Override
	public List<UserDto> getUserDtosList() {
		return pbUserMapper.getUserDtosList();
	}

	@Override
	public UserDto getUserDtoByUserUUID(String userUUID) {
		return pbUserMapper.getUserDtoByUserUUID(userUUID);
	}

	@Override
	public void delUserDtoByUserUUID(String userUUID) {
		pbUserMapper.delUserDtoByUserUUID(userUUID);
	}

	@Override
	public void modUserPasswordByUserUUID(String userPassword, String userUUID) {
		pbUserMapper.modUserPasswordByUserUUID(userPassword, userUUID);
	}

}
