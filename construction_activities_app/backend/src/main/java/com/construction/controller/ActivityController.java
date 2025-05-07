package com.construction.controller;

import com.construction.model.Activity;
import com.construction.repository.ActivityRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/activities")
@CrossOrigin(origins = "*")
public class ActivityController {

    private final ActivityRepository repository;

    public ActivityController(ActivityRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Activity> getAllActivities() {
        return repository.findAll();
    }

    @PostMapping
    public Activity createActivity(@RequestBody Activity activity) {
        return repository.save(activity);
    }

    @PutMapping("/{id}")
    public Activity updateActivity(@PathVariable Long id, @RequestBody Activity activity) {
        activity.setId(id);
        return repository.save(activity);
    }

    @DeleteMapping("/{id}")
    public void deleteActivity(@PathVariable Long id) {
        repository.deleteById(id);
    }
}