
# 1.使用的技术
- vue3
- TypeScript
- Vite（构建工具）
- pinia（状态管理工具）

# 2.主要功能
- 新奇的想法聚合工具

# 3.推荐IDE
- webStorm

# 4.分支情况
## main 分支：
- 主分支，最终的、稳定的、经过测试没有 bug 的、可部署于生产环境的分支。
- 只能由 release 和 hotfix 分支合并，任何情况下都不能直接修改代码
## dev 分支：
- 主要开发分支，贯穿于整个项目的生命周期
- 始终保持最新版本，功能模块开发任务交给 feature 分支，测试任务交给 release 分支
## hotfix 分支：
- 热修复分支，当 main 分支部署到生产环境后发生紧急状况，需要及时处理时，该分支负责热修复，即在保证应用不下线的条件下，对 bug 进行紧急修复
- 该分支以 main 分支为基线，修复 bug 后，合并到 main 分支部署上线，同时也合并到 dev 分支保持最新进度
- 命名规则： hotfix/NAME 或 hotfix-NAME
## feature 分支：
- 功能模块开发分支，对应于一个特定的功能模块
- 该分支以 dev 分支为基线，完成开发工作后再合并到 dev 分支
- 命名规则：feature/NAME 或 feature-NAME
## release 分支：
- 预发布分支，在发布正式版本前进行全面测试和修复
- 该分支以 dev 分支为基线进行全面测试，若发生 bug 则可直接在该分支修复并提交
- 经过测试没有问题之后，合并到 main 分支部署上线，同时也合并到 dev 分支保持最新进度
- 命名规则：release/NAME 或 release-NAME

## 5.git提交信息
### 每个类型值都表示了不同的含义，类型值必须是以下的其中一个：
- feat：提交新功能
- fix：修复了bug
- docs：只修改了文档
- style：调整代码格式，未修改代码逻辑（比如修改空格、格式化、缺少分号等）
- refactor：代码重构，既没修复bug也没有添加新功能
- perf：性能优化，提高性能的代码更改
- test：添加或修改代码测试
- chore：对构建流程或辅助工具和依赖库（如文档生成等）的更改