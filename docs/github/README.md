# github

## 将本地文件推动到github仓库

   - git  push  远程仓库地址   分支

     - 为远程仓库添加别名

       - git  remote  add  别名  远程仓库地址

       - 如：

         ```
         git  remote  add  origin  https://github.com/demo/git-demo.git
         // 将后面的远程地址添加别名origin后，使用origin即可代替该地址
         //如：
         	git push origin master
         ```

   - 登录验证权限

   - 记录仓库地址和分支

     ```
     git  push  -u  origin  master
     // 添加 -u 后，git会记录推送的仓库地址和分支，后面推送会自动推送到该仓库的该分支
     // 之后即可直接push
     	git  push
     ```

## 克隆仓库

   - ```
     git  clone  仓库地址
     ```

## 拉取仓库内容

   - git  pull  仓库地址  分支
   - 如果远程仓库版本高于本地仓库，那么本地仓库是无法直接推送的，必须先pull更新本地仓库，才能推送修改 
   
## SSH免密推送

   - 分为公钥和私钥，私钥保存在本地，公钥保存在GitHub，每次使用SSH推送会自动验证公钥和私钥是否配对，配对成功则推送，负责，推送失败

   - 生成公钥和私钥

     ```
     ssh-keygen
     // 多次回车使用默认值即可
     ```

     - 生成秘钥后，会存储在用户文件夹下的 `.ssh` 文件夹内，有 `id_rsa` 和 `id_rsa.pub` 两个文件，`id_rsa.pub` 为公钥文件

   - 打开 `id_rsa.pub` 公钥文件，复制内容，到GitHub账户的设置中添加SSH公钥即可

   - 后续推送使用SSH协议即可

## GIT忽略清单

   - `.gitignore` 文件内保存的就是GIT忽略的文件清单
