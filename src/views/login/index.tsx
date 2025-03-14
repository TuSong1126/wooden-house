import './index.scss'

import { message } from 'antd'
import { useState } from 'react'

import { fetchLogin, fetchPermission, fetchRegister } from '@/apis/auth'
import Video from '@/assets/video/video.mp4'
import { useRouter } from '@/hooks/basic/useRouter'
import useUserInfoStore from '@/store/userInfo'

const { VITE_APP_HOMEPAGE } = import.meta.env

const Login = () => {
  const userInfoStore = useUserInfoStore()
  const router = useRouter()

  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('123456')

  const handleLogin = async () => {
    if (!username || !password) {
      message.error('请输入正确的账号和密码！')
      return
    }

    const { data } = await fetchLogin({ username, password })
    const { token, userInfo } = data
    userInfoStore.updateToken(token)
    userInfoStore.updateUserInfo(userInfo)

    const { data: perm } = await fetchPermission()
    userInfoStore.updatePermission({
      btns: perm.btns,
      routes: perm.routes
    })

    router.replace(VITE_APP_HOMEPAGE)
  }

  const handleRegister = async () => {
    if (!username || !password) {
      message.error('请输入正确的账号和密码！')
      return
    }

    const { msg } = await fetchRegister({ username, password })
    message.success(msg)
  }

  return (
    <div className="login-wrapper">
      <div className="form">
        <div className="left">
          <video src={Video} muted loop autoPlay />
        </div>

        <div className="right">
          <div className="right-con">
            <h2>Inn</h2>

            <form>
              <h3>账号</h3>
              <input className="text" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />

              <h3>密码</h3>
              <input
                className="text"
                type="password"
                autoComplete="off"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </form>

            <div className="btn-area">
              <input className="btn" type="submit" value="登录" onClick={handleLogin} />
              <input className="btn" type="submit" value="注册" onClick={handleRegister} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
