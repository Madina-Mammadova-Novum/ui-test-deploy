# CI/CD Diagrams - Complete Index

Quick reference for all PlantUML diagrams and documentation.

## 🎯 What We Have

**3 comprehensive PlantUML diagrams** documenting the entire CI/CD pipeline for ShipLink Frontend.

## 📊 PlantUML Diagram Files

| File                                                               | Type       | Lines | Best For                         |
| ------------------------------------------------------------------ | ---------- | ----- | -------------------------------- |
| **[CI-CD-FLOW.puml](./CI-CD-FLOW.puml)**                           | Complete   | ~300  | Documentation, onboarding        |
| **[CI-CD-FLOW-SIMPLE.puml](./CI-CD-FLOW-SIMPLE.puml)**             | Simple     | ~150  | Presentations, quick reference   |
| **[CI-CD-FLOW-ARCHITECTURE.puml](./CI-CD-FLOW-ARCHITECTURE.puml)** | Components | ~300  | Architecture review, integration |

---

## 📚 Documentation Files

| File                                           | Purpose                                        |
| ---------------------------------------------- | ---------------------------------------------- |
| **[DIAGRAMS-README.md](./DIAGRAMS-README.md)** | Complete guide to rendering and using diagrams |
| **[DIAGRAMS-INDEX.md](./DIAGRAMS-INDEX.md)**   | This file - quick navigation                   |

---

## 🎯 Quick Access by Use Case

### "I want to understand the complete pipeline"

→ **[CI-CD-FLOW.puml](./CI-CD-FLOW.puml)**

- Most comprehensive
- All workflows, jobs, and steps
- GitHub Environments details
- Performance metrics

### "I need a simple overview for a presentation"

→ **[CI-CD-FLOW-SIMPLE.puml](./CI-CD-FLOW-SIMPLE.puml)**

- Clean, high-level view
- Key components only
- Easy to understand
- Single page

### "I need to see how everything connects"

→ **[CI-CD-FLOW-ARCHITECTURE.puml](./CI-CD-FLOW-ARCHITECTURE.puml)**

- Component relationships
- Service connections
- Data flows
- Infrastructure view

---

## 🚀 Quick Start

### 1. View Online (No Installation)

```
https://www.plantuml.com/plantuml/uml/
→ Copy-paste .puml content
→ Click "Submit"
→ Download as PNG/SVG
```

### 2. View in VS Code

```
1. Install "PlantUML" extension
2. Open any .puml file
3. Press Alt+D
4. Preview appears
```

### 3. Generate All Diagrams

> **Note:** This project uses Yarn as the primary package manager.

```bash
# Install PlantUML (use latest version - recommended)
yarn global add node-plantuml-latest

# Generate all as PNG
puml generate *.puml -o diagrams/

# Generate all as SVG (scalable, recommended)
puml generate *.puml -o diagrams/ -f svg

# Generate specific diagram
puml generate CI-CD-FLOW.puml -o output.png
```

---

## 📐 Diagram Comparison Matrix

|                  |  Complete  | Simple | Architecture |
| ---------------- | :--------: | :----: | :----------: |
| **Detail Level** | ⭐⭐⭐⭐⭐ |  ⭐⭐  |   ⭐⭐⭐⭐   |
| **File Size**    |   Large    | Small  |    Large     |
| **Render Time**  |    ~10s    |  ~3s   |     ~10s     |
| **Pages**        |    2-3     |   1    |      2       |
| **For Devs**     |     ✅     |   ⚠️   |      ✅      |
| **For Managers** |     ⚠️     |   ✅   |      ⚠️      |
| **For DevOps**   |     ✅     |   ⚠️   |      ✅      |
| **For Backend**  |     ✅     |   ✅   |      ✅      |

---

## 🎨 What's Included

### All Diagrams Show:

- ✅ 5 GitHub Actions workflows
- ✅ 9 workflow jobs
- ✅ 3 environments (dev, stage, prod)
- ✅ Branch strategy
- ✅ Deployment flow

### Complete Diagram (CI-CD-FLOW.puml) Also Shows:

- ✅ 50+ individual steps
- ✅ GitHub Environment configuration
- ✅ Secret management (45 per env)
- ✅ Performance optimizations
- ✅ Cache strategies
- ✅ Path filtering logic
- ✅ Release management flow

### Architecture Diagram (CI-CD-FLOW-ARCHITECTURE.puml) Also Shows:

- ✅ External services (ACR, VMs)
- ✅ Docker operations
- ✅ Component connections
- ✅ Data flows
- ✅ Service interconnections
- ✅ System statistics

---

## 📊 Coverage Statistics

**Workflows Documented:** 5/5 (100%)

- ✅ pr-validation.yml
- ✅ commit-validation.yml
- ✅ deploy-dev.yml
- ✅ deploy-stage.yml
- ✅ deploy-prod.yml

**Jobs Documented:** 9/9 (100%)

- ✅ Code Quality & Build
- ✅ Security Scan
- ✅ Performance Check
- ✅ Validate Commits
- ✅ Validate Source Branch
- ✅ Build & Push Docker Image
- ✅ Deploy to Server
- ✅ Health Checks

**Features Documented:**

- ✅ Parallel job execution
- ✅ Reusable workflows
- ✅ GitHub Environments
- ✅ Manual approvals
- ✅ Automated rollback
- ✅ Health checks
- ✅ Cache strategy
- ✅ Path filtering
- ✅ Draft PR skip

---

## 🔄 Update Workflow

### When Workflow Changes:

1. Update corresponding `.puml` file
2. Regenerate images
3. Update documentation if needed
4. Commit with message: `docs(ci): update diagrams for [change]`

### Monthly Review:

- [ ] Verify all workflows covered
- [ ] Check for new features
- [ ] Update metrics
- [ ] Regenerate all images
- [ ] Review with team

---

## 🎨 Visual Style

### Color Scheme

- **Blue (#3B82F6)** - PR Validation workflows
- **Purple (#8B5CF6)** - Commit validation
- **Green (#10B981)** - Build & registry operations
- **Teal (#14B8A6)** - Deployment operations
- **Amber (#F59E0B)** - Health checks & monitoring
- **Red (#EF4444)** - Validation failures & rollback
- **Light Green (#22C55E)** - Success states

### Layout Principles

- **Left to Right** for process flows
- **Top to Bottom** for hierarchies
- **Parallel** for concurrent jobs
- **Dotted lines** for optional paths
- **Bold boxes** for critical components

---

## 🤝 Sharing with Backend Team

### Files to Share:

1. All 3 `.puml` source files
2. Exported PNG/SVG images
3. DIAGRAMS-README.md
4. This index file

### Integration Points:

- Both teams use same color scheme
- Consistent naming conventions
- Cross-reference between systems
- Unified documentation style

---

## 💡 Pro Tips

### For Best Results:

- **Export as SVG** for scalability
- **Use PNG** for documentation
- **Use PDF** for presentations
- **Keep source files** in Git

### For Figma Users:

1. **Start with Simple** - Use CI-CD-FLOW-SIMPLE.puml as base
2. **Add Details** - Reference CI-CD-FLOW.puml for components
3. **Connections** - Use CI-CD-FLOW-ARCHITECTURE.puml for links
4. Export as SVG and import into Figma
5. Ungroup and apply your design system

### Recommended Figma Structure:

```
Page 1: PR Validation (3 parallel jobs + commit validation)
Page 2: Branch Flow (all branches + environment mapping)
Page 3: Deployment (3 caller workflows + reusable workflow)
Page 4: Production Safety (validation + health checks + rollback)
```

### For Confluence/Wiki:

1. Export as PNG (high DPI)
2. Upload to page
3. Link to source files
4. Add update date

---

## 📊 Pipeline Statistics

**Components Documented:**

- ✅ 5 GitHub Actions workflows
- ✅ 9 workflow jobs
- ✅ 50+ individual steps
- ✅ 3 environments (dev, stage, prod)
- ✅ 45 secrets per environment
- ✅ 4 external services (ACR, Docker servers)
- ✅ 6 branch types

**Performance Metrics:**

- ⚡ 60% faster PR CI time
- 📦 80% cache hit rate
- 💰 60% cost savings monthly
- 🎯 85% reduction in unnecessary runs
- ✅ 100% docs changes skipped

**Coverage:** 100% of CI/CD pipeline

---

## 📞 Support

### For Diagram Issues:

- Check [DIAGRAMS-README.md](./DIAGRAMS-README.md)
- PlantUML docs: https://plantuml.com/
- VS Code extension: Search "PlantUML"

### For Workflow Questions:

- See main [README.md](./README.md)
- Check [DEPLOYMENT_SETUP.md](./DEPLOYMENT_SETUP.md)
- Review [RELEASE_PROCESS.md](./RELEASE_PROCESS.md)

### For Technical Support:

- DevOps team
- GitHub Actions documentation
- Team Slack channel

---

## ✨ Quick Navigation

```
.github/workflows/
├── DIAGRAMS-INDEX.md              ← You are here
├── DIAGRAMS-README.md             ← Full rendering guide
├── CI-CD-FLOW.puml                ← Complete diagram
├── CI-CD-FLOW-SIMPLE.puml         ← Simple overview
└── CI-CD-FLOW-ARCHITECTURE.puml   ← Architecture view
```

---

**Version:** 2.0  
**Last Updated:** October 2025  
**Maintained By:** DevOps & Frontend Team

**Total Diagrams:** 3  
**Total Lines of PlantUML Code:** ~750  
**Coverage:** 100% of CI/CD pipeline

---

**Ready to render? Start with [DIAGRAMS-README.md](./DIAGRAMS-README.md)** 🚀
