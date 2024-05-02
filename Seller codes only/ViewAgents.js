// Function to fetch list of agents
function fetchAgents() {
    // Replace this with actual fetching logic
    // For now, let's assume we have a sample data
    const sampleAgents = [
        { id: 1, name: "Agent 1" },
        { id: 2, name: "Agent 2" },
        { id: 3, name: "Agent 3" }
    ];
    
    // Render agents on the dashboard
    const dashboard = document.getElementById('dashboard');
    dashboard.innerHTML = ""; // Clear existing content
    
    sampleAgents.forEach(agent => {
        const agentElement = document.createElement('div');
        agentElement.classList.add('agent');
        agentElement.innerHTML = `
            <h2>${agent.name}</h2>
        `;
        dashboard.appendChild(agentElement);
    });
}
