# CI/CD Flow Diagrams

This directory contains PlantUML diagrams documenting the complete CI/CD pipeline for ShipLink Frontend.

## 📊 Available Diagrams

### 1. **CI-CD-FLOW.puml** (Comprehensive)

The complete, detailed CI/CD architecture showing:

- All 5 workflows with detailed steps
- PR validation jobs (parallel execution)
- Commit validation
- Branch strategy and flow
- Deployment workflows (dev, stage, prod)
- Reusable workflow internals
- Health checks (production)
- Release management
- GitHub Environments
- Performance metrics

**Best for:** Documentation, technical reviews, onboarding

---

### 2. **CI-CD-FLOW-SIMPLE.puml** (Simplified)

A cleaner, high-level overview showing:

- Key components and phases
- Branch flow
- Deployment pipeline structure
- Release flow
- Core metrics

**Best for:** Presentations, quick reference, stakeholder updates

---

### 3. **CI-CD-FLOW-ARCHITECTURE.puml** (Component Architecture)

System architecture and interconnections showing:

- Workflow components and relationships
- External services (ACR, Docker servers)
- GitHub Environments configuration
- Service connections and data flows
- Docker operations
- System statistics

**Best for:** Architecture reviews, infrastructure planning, DevOps integration

---

## 🚀 How to Render

### Option 1: Online (Fastest)

1. **PlantUML Web Server** (Recommended)
   - Go to: https://www.plantuml.com/plantuml/uml/
   - Copy-paste the content of any `.puml` file
   - Click "Submit"
   - Download as PNG, SVG, or PDF

2. **PlantText**
   - Go to: https://www.planttext.com/
   - Paste diagram code
   - Auto-renders in real-time

---

### Option 2: VS Code Extension

1. **Install PlantUML Extension**

   ```bash
   # In VS Code, install:
   Name: PlantUML
   Id: jebbs.plantuml
   Publisher: jebbs
   ```

2. **Install Java** (Required by PlantUML)

   ```bash
   # Windows (via Chocolatey)
   choco install openjdk11

   # Or download from: https://adoptium.net/
   ```

3. **Install Graphviz** (Required for diagram rendering)

   ```bash
   # Windows (via Chocolatey)
   choco install graphviz

   # Or download from: https://graphviz.org/download/
   ```

4. **View Diagram**
   - Open any `.puml` file in VS Code
   - Press `Alt+D` to preview
   - Or right-click → "Preview Current Diagram"

5. **Export Diagram**
   - Press `Ctrl+Shift+P`
   - Type "PlantUML: Export Current Diagram"
   - Choose format: PNG, SVG, PDF

---

### Option 3: CLI (For Automation)

> **Note:** This project uses Yarn as the primary package manager.

1. **Install PlantUML CLI**

   ```bash
   # Via yarn (recommended - this project uses Yarn)
   yarn global add node-plantuml-latest

   # Or via npm (alternative)
   npm install -g node-plantuml-latest

   # Or download plantuml.jar directly
   # https://plantuml.com/download
   ```

2. **Generate Single Diagram**

   ```bash
   # Using node-plantuml-latest
   puml generate CI-CD-FLOW.puml -o output.png

   # Generate as SVG
   puml generate CI-CD-FLOW.puml -o output.svg

   # Or using plantuml.jar
   java -jar plantuml.jar CI-CD-FLOW.puml
   ```

3. **Batch Generate All Diagrams**

   ```bash
   # Using node-plantuml-latest (generate all as PNG)
   puml generate CI-CD-FLOW*.puml -o diagrams/

   # Generate all as SVG (scalable, recommended)
   puml generate CI-CD-FLOW*.puml -o diagrams/ -f svg

   # Or using plantuml.jar
   # Generate all diagrams as PNG
   java -jar plantuml.jar *.puml

   # Generate as SVG (scalable)
   java -jar plantuml.jar -tsvg *.puml
   ```

4. **Example: Generate All 3 Diagrams**

   ```bash
   # Create output directory
   mkdir -p diagrams

   # Generate all diagrams as PNG and SVG
   puml generate CI-CD-FLOW.puml -o diagrams/ci-cd-flow.png
   puml generate CI-CD-FLOW-SIMPLE.puml -o diagrams/ci-cd-flow-simple.png
   puml generate CI-CD-FLOW-ARCHITECTURE.puml -o diagrams/ci-cd-flow-architecture.png

   # Or all at once
   puml generate *.puml -o diagrams/
   ```

---

### Option 4: GitHub Integration

1. **GitHub Actions Workflow** (Auto-generate on commit)

   Create `.github/workflows/generate-diagrams.yml`:

   ```yaml
   name: Generate PlantUML Diagrams

   on:
     push:
       paths:
         - '.github/workflows/*.puml'

   jobs:
     generate:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4

         - name: Generate PlantUML Diagrams
           uses: cloudbees/plantuml-github-action@master
           with:
             args: -v -tpng .github/workflows/*.puml

         - name: Commit Generated Images
           run: |
             git config --local user.email "action@github.com"
             git config --local user.name "GitHub Action"
             git add *.png
             git commit -m "chore: update generated diagrams" || echo "No changes"
             git push
   ```

2. **View in README**
   ```markdown
   ![CI/CD Flow](CI-CD-FLOW.png)
   ```

---

## 📝 Editing Diagrams

### Quick Tips

1. **Colors**: Defined at the top using `!define`

   ```plantuml
   !define BLUE #3B82F6
   skinparam rectangleBackgroundColor<<PR>> BLUE
   ```

2. **Add New Component**

   ```plantuml
   rectangle "New Job" as NewJob {
       rectangle "Step 1" as S1
       rectangle "Step 2" as S2
       S1 --> S2
   }
   ```

3. **Change Connections**

   ```plantuml
   ComponentA --> ComponentB : label
   ComponentA -down-> ComponentB : vertical
   ComponentA ..> ComponentB : dotted line
   ```

4. **Add Notes**
   ```plantuml
   note right of Component
     Important information
     about this component
   end note
   ```

---

## 🎨 Visual Customization

### Current Color Scheme

| Color       | Hex Code  | Usage               |
| ----------- | --------- | ------------------- |
| Blue        | `#3B82F6` | PR Validation       |
| Purple      | `#8B5CF6` | Commit Validation   |
| Green       | `#10B981` | Build Job           |
| Teal        | `#14B8A6` | Deploy Job          |
| Amber       | `#F59E0B` | Health Checks       |
| Red         | `#EF4444` | Validation/Rollback |
| Light Green | `#22C55E` | Success States      |

### Custom Theme

To change the entire theme:

```plantuml
!theme cerulean
' Other themes: plain, blueprint, sketchy, spacelab
```

---

## 📤 Export Formats

PlantUML supports multiple output formats:

- **PNG**: Raster image (default)
- **SVG**: Vector image (scalable, recommended for web)
- **PDF**: For documentation
- **EPS**: For print
- **TXT**: ASCII art (for terminals!)

Export command:

```bash
# PNG (default)
java -jar plantuml.jar diagram.puml

# SVG (scalable)
java -jar plantuml.jar -tsvg diagram.puml

# PDF (documentation)
java -jar plantuml.jar -tpdf diagram.puml

# Multiple formats at once
java -jar plantuml.jar -tpng -tsvg diagram.puml
```

---

## 🔄 Keeping Diagrams Updated

### When to Update

Update diagrams when you:

- ✅ Add new workflows
- ✅ Change job structure
- ✅ Modify deployment steps
- ✅ Add/remove health checks
- ✅ Change branch strategy
- ✅ Update environment configuration

### Update Checklist

- [ ] Update `.puml` file(s)
- [ ] Regenerate images
- [ ] Update documentation references
- [ ] Commit changes with descriptive message
- [ ] Review with team

---

## 📚 PlantUML Resources

### Official Documentation

- **Website**: https://plantuml.com/
- **Component Diagram**: https://plantuml.com/component-diagram
- **Sequence Diagram**: https://plantuml.com/sequence-diagram
- **Deployment Diagram**: https://plantuml.com/deployment-diagram

### Cheat Sheets

- **Quick Reference**: https://plantuml.com/guide
- **Color Names**: https://plantuml.com/color
- **Skinparam**: https://plantuml-documentation.readthedocs.io/en/latest/formatting/all-skin-params.html

### Community

- **Forum**: https://forum.plantuml.net/
- **GitHub**: https://github.com/plantuml/plantuml

---

## 🤝 Contribution Guidelines

### Adding New Diagrams

1. Create new `.puml` file with descriptive name
2. Follow existing naming convention
3. Use consistent colors from scheme
4. Add comments explaining complex sections
5. Update this README with new diagram info

### Suggesting Changes

1. Create feature branch
2. Update `.puml` file
3. Generate preview
4. Create PR with screenshots
5. Tag DevOps team for review

---

## 🔍 Troubleshooting

### "Cannot find Java"

**Solution**: Install Java 11 or higher

```bash
java -version  # Should show 11+
```

### "Cannot find Graphviz"

**Solution**: Install Graphviz and add to PATH

```bash
dot -version  # Should show Graphviz version
```

### "Syntax Error in PlantUML"

**Solution**: Validate syntax online first

- Go to https://www.plantuml.com/plantuml/uml/
- Paste your code
- Check for error messages

### "Diagram Too Large"

**Solution**: Split into multiple diagrams or increase memory

```bash
java -Xmx2048m -jar plantuml.jar diagram.puml
```

---

## 📧 Support

For questions about:

- **Diagram content**: Contact DevOps team
- **Technical issues**: Check PlantUML documentation
- **Workflow changes**: Create issue in repository

---

**Last Updated**: October 2025  
**Maintained By**: DevOps & Frontend Team  
**Version**: 2.0

---

## Quick Start Summary

```bash
# 1. Install (one-time setup)
choco install openjdk11 graphviz

# 2. Install VS Code extension
# Search: "PlantUML" by jebbs

# 3. Install CLI tool (optional, for automation)
yarn global add node-plantuml-latest

# 4. Open any diagram in VS Code
code CI-CD-FLOW.puml
# or CI-CD-FLOW-SIMPLE.puml
# or CI-CD-FLOW-ARCHITECTURE.puml

# 5. Preview
# Press Alt+D

# 6. Export
# Ctrl+Shift+P → "PlantUML: Export Current Diagram"

# 7. Or generate via CLI
puml generate CI-CD-FLOW.puml -o output.png

# Done! 🎉
```

---

## 📂 File Structure

```
.github/workflows/
├── DIAGRAMS-INDEX.md              ← Quick navigation
├── DIAGRAMS-README.md             ← This file (rendering guide)
├── CI-CD-FLOW.puml                ← Complete detailed diagram
├── CI-CD-FLOW-SIMPLE.puml         ← Simple overview
└── CI-CD-FLOW-ARCHITECTURE.puml   ← Architecture & components
```
