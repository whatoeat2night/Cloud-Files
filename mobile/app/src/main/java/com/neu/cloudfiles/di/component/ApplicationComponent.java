package com.neu.cloudfiles.di.component;
import android.content.Context;

import com.neu.cloudfiles.di.module.ApplicationModule;
import com.neu.cloudfiles.di.scope.ContextLife;
import com.neu.cloudfiles.di.scope.PerApp;

import dagger.Component;


/**
 * Created by lw on 2017/1/19.
 */
@PerApp
@Component(modules = ApplicationModule.class)
public interface ApplicationComponent {
    @ContextLife("Application")
    Context getApplication();
}