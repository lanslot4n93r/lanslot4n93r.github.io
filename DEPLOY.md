# GitHub Pages 部署配置

## 方案选择：主分支根目录部署

本项目采用 **GitHub Actions 自动部署到 gh-pages 分支** 的方式，无需构建步骤（纯静态 HTML）。

### 部署方式

**方式一：GitHub Actions（推荐）**
1. 将仓库推送到 GitHub
2. 在仓库 Settings → Pages → Source 选择 "GitHub Actions"
3. `.github/workflows/deploy.yml` 会自动部署

**方式二：手动部署到 gh-pages 分支**
```bash
git checkout --orphan gh-pages
git rm -rf .
cp -r /opt/yugene/note/7u93n3-clone/* .
git add .
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages
```

**方式三：docs/ 目录部署**
```bash
# 在仓库根目录
cp -r /opt/yugene/note/7u93n3-clone docs/
git add docs/
git commit -m "Add GitHub Pages from docs/"
git push
# Settings → Pages → Source → "Deploy from a branch" → "main" / "docs"
```

### 本地预览
```bash
cd /opt/yugene/note/7u93n3-clone
python3 -m http.server 8080
# 浏览器打开 http://localhost:8080
```
