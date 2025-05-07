import React, { useState, useEffect } from 'react';
import { createActivity, getActivities, deleteActivity } from '../services/activityService';

export default function ActivityForm() {
  const [type, setType] = useState('');
  const [name, setName] = useState('');
  const [activities, setActivities] = useState([]);

  const [formState, setFormState] = useState({
    poleInstallation: false,
    poleEquipmentInstallation: false,
    electricalInstallation: false,
    nemaBoxInstallation: false,
    vaultInstallation: false,
    trenchingPath: '',
    trenchingDone: false,
    indoorApInstallation: false,
    outdoorApInstallation: false,
    cabinNemaBoxInstallation: false,
    cabinElectricalInstallation: false,
    headendEquipmentInstallation: false,
    headendEquipmentConfiguration: false,
  });

  const loadActivities = () => {
    getActivities().then(res => setActivities(res.data));
  };

  useEffect(() => {
    loadActivities();
  }, []);

  const handleCheckboxChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const activity = { type, name, ...formState };
    createActivity(activity).then(() => {
      loadActivities();
      setName('');
    });
  };

  const renderFields = () => {
    switch (type) {
      case 'Pole':
        return <>
          <label><input type="checkbox" name="poleInstallation" onChange={handleCheckboxChange}/> Pole Installation</label>
          <label><input type="checkbox" name="poleEquipmentInstallation" onChange={handleCheckboxChange}/> Pole Equipment Installation</label>
          <label><input type="checkbox" name="electricalInstallation" onChange={handleCheckboxChange}/> Electrical Installation</label>
          <label><input type="checkbox" name="nemaBoxInstallation" onChange={handleCheckboxChange}/> NEMA Box Installation</label>
        </>;
      case 'Vault':
        return <>
          <label><input type="checkbox" name="vaultInstallation" onChange={handleCheckboxChange}/> Vault Installation</label>
          <input type="text" placeholder="Trenching Path" onChange={(e) => setFormState({ ...formState, trenchingPath: e.target.value })} />
          <label><input type="checkbox" name="trenchingDone" onChange={handleCheckboxChange}/> Trenching Done</label>
        </>;
      case 'Cabin':
        return <>
          <label><input type="checkbox" name="indoorApInstallation" onChange={handleCheckboxChange}/> Indoor AP Installation</label>
          <label><input type="checkbox" name="outdoorApInstallation" onChange={handleCheckboxChange}/> Outdoor AP Installation</label>
          <label><input type="checkbox" name="cabinNemaBoxInstallation" onChange={handleCheckboxChange}/> Cabin NEMA Box Installation</label>
          <label><input type="checkbox" name="cabinElectricalInstallation" onChange={handleCheckboxChange}/> Cabin Electrical Installation</label>
        </>;
      case 'Headend':
        return <>
          <label><input type="checkbox" name="headendEquipmentInstallation" onChange={handleCheckboxChange}/> Headend Equipment Installation</label>
          <label><input type="checkbox" name="headendEquipmentConfiguration" onChange={handleCheckboxChange}/> Headend Equipment Configuration</label>
        </>;
      default:
        return null;
    }
  };

  return (
    <div>
      <h2>New Activity</h2>
      <form onSubmit={handleSubmit}>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">Select Type</option>
          <option value="Pole">Pole</option>
          <option value="Vault">Vault</option>
          <option value="Cabin">Cabin</option>
          <option value="Headend">Headend</option>
        </select>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        {renderFields()}
        <button type="submit">Save Activity</button>
      </form>

      <h3>Existing Activities</h3>
      <ul>
        {activities.map(act => (
          <li key={act.id}>
            {act.type} - {act.name} 
            <button onClick={() => deleteActivity(act.id).then(loadActivities)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}